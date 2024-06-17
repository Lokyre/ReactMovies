const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '228a5c0f55d3caa8bc190520d6246048',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;