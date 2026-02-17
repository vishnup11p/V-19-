// Content filtering utilities for kids profiles

export const AGE_RATINGS = {
    ALL: 'All Ages',
    U: 'U',           // Universal
    PG: 'PG',         // Parental Guidance
    '12+': '12+',
    '16+': '16+',
    '18+': '18+'
};

export const MATURITY_LEVELS = {
    KIDS: 'kids',      // U, PG only
    TEEN: 'teen',      // U, PG, 12+, 16+
    ADULT: 'adult'     // All ratings
};

// Map age ratings to maturity levels
const RATING_MATURITY_MAP = {
    [AGE_RATINGS.ALL]: [MATURITY_LEVELS.KIDS, MATURITY_LEVELS.TEEN, MATURITY_LEVELS.ADULT],
    [AGE_RATINGS.U]: [MATURITY_LEVELS.KIDS, MATURITY_LEVELS.TEEN, MATURITY_LEVELS.ADULT],
    [AGE_RATINGS.PG]: [MATURITY_LEVELS.KIDS, MATURITY_LEVELS.TEEN, MATURITY_LEVELS.ADULT],
    [AGE_RATINGS['12+']]: [MATURITY_LEVELS.TEEN, MATURITY_LEVELS.ADULT],
    [AGE_RATINGS['16+']]: [MATURITY_LEVELS.TEEN, MATURITY_LEVELS.ADULT],
    [AGE_RATINGS['18+']]: [MATURITY_LEVELS.ADULT]
};

// Filter content based on profile maturity level
export const filterContentByMaturity = (content, maturityLevel) => {
    if (!content) return [];

    return content.filter(item => {
        const rating = item.age_rating || AGE_RATINGS.ALL;
        const allowedLevels = RATING_MATURITY_MAP[rating] || [MATURITY_LEVELS.ADULT];
        return allowedLevels.includes(maturityLevel);
    });
};

// Check if content is appropriate for profile
export const isContentAppropriate = (content, profile) => {
    if (!profile || !profile.is_kids) return true;

    const rating = content.age_rating || AGE_RATINGS.ALL;
    const maturityLevel = profile.is_kids ? MATURITY_LEVELS.KIDS : MATURITY_LEVELS.ADULT;
    const allowedLevels = RATING_MATURITY_MAP[rating] || [MATURITY_LEVELS.ADULT];

    return allowedLevels.includes(maturityLevel);
};

// Get maturity level from profile
export const getProfileMaturityLevel = (profile) => {
    if (!profile) return MATURITY_LEVELS.ADULT;
    if (profile.is_kids) return MATURITY_LEVELS.KIDS;
    if (profile.maturity_level) return profile.maturity_level;
    return MATURITY_LEVELS.ADULT;
};
