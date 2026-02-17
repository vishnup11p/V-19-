-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE (Extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  username text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- CONTENT TABLE (Movies & Series)
create table public.content (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  thumbnail_url text, -- Poster image
  video_url text, -- Main video file (Cloudinary/Supabase)
  trailer_url text, -- Autoplay trailer
  duration integer, -- In minutes
  release_year integer,
  genre text[], -- Array of genres e.g. ['Action', 'Sci-Fi']
  rating numeric(3, 1), -- e.g. 8.5
  type text check (type in ('movie', 'series', 'episode')), 
  series_id uuid references public.content(id), -- If type is episode, links to series
  season_number integer,
  episode_number integer,
  is_trending boolean default false,
  is_original boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on content
alter table public.content enable row level security;

create policy "Content is viewable by everyone."
  on content for select
  using ( true );

create policy "Admins can insert content."
  on content for insert
  with check ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

create policy "Admins can update content."
  on content for update
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

create policy "Admins can delete content."
  on content for delete
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

-- WATCHLIST TABLE
create table public.watchlist (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  content_id uuid references public.content(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, content_id)
);

alter table public.watchlist enable row level security;

create policy "Users can view their own watchlist."
  on watchlist for select
  using ( auth.uid() = user_id );

create policy "Users can add to their watchlist."
  on watchlist for insert
  with check ( auth.uid() = user_id );

create policy "Users can remove from their watchlist."
  on watchlist for delete
  using ( auth.uid() = user_id );

-- WATCH HISTORY TABLE (Continue Watching)
create table public.watch_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  content_id uuid references public.content(id) not null,
  progress_seconds integer default 0, -- Last watched position
  completed boolean default false,
  last_watched_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, content_id)
);

alter table public.watch_history enable row level security;

create policy "Users can view their own watch history."
  on watch_history for select
  using ( auth.uid() = user_id );

create policy "Users can insert/update their watch history."
  on watch_history for all
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

-- SUBSCRIPTIONS TABLE
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  plan_type text check (plan_type in ('free', 'premium')) default 'free',
  start_date timestamp with time zone default timezone('utc'::text, now()),
  end_date timestamp with time zone,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.subscriptions enable row level security;

create policy "Users can view their own subscription."
  on subscriptions for select
  using ( auth.uid() = user_id );

-- HANDLE NEW USER TRIGGER (Automatically create profile)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, username)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  insert into public.subscriptions (user_id, plan_type)
  values (new.id, 'free');
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger must be created in the auth context manually or assumed to be run by superuser in SQL editor
-- Note: Triggers on auth.users are tricky to script directly without superuser, but this provides the code.
