export default function getOne (model) {
  const cache = localStorage.getItem(model)
  if (cache) return JSON.parse(cache)
  return {}
}
