// 获取assets静态资源
export const getAssetsFile = (url: string) => new URL(`../../assets/images/${url}`, import.meta.url).href