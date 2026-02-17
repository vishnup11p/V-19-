# Contributing to V 19+

Thank you for your interest in contributing to V 19+ OTT Platform!

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/v19-ott.git`
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env` and configure
5. Run development server: `npm run dev`

## Code Style

- Use ES6+ features
- Follow React best practices
- Use Tailwind CSS for styling (avoid inline styles)
- Keep components small and focused
- Add comments for complex logic

## Commit Guidelines

- Use clear, descriptive commit messages
- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(player): add picture-in-picture support
fix(auth): resolve login redirect loop
docs(readme): update installation steps
```

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly in both demo and production modes
4. Commit with clear messages
5. Push to your fork
6. Open a Pull Request with description of changes

## Testing

- Test in demo mode (without Supabase)
- Test with Supabase configured
- Verify mobile responsiveness
- Check browser console for errors

## Questions?

Open an issue for discussion before major changes.
