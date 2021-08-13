export const testServer = (
    process.env.NODE_ENV === 'production' ?
    '/api' :
    '/api'
)