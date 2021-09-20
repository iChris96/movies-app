export const DESCENDING = -1;
export const ASCENDING = 1;

export const sortByValues: any = {
    'popularity.asc': { sort: 'popularity', order: ASCENDING },
    'popularity.desc': { sort: 'popularity', order: DESCENDING },
    'vote_count.asc': { sort: 'vote_count', order: ASCENDING },
    'vote_count.desc': { sort: 'vote_count', order: DESCENDING },
};
