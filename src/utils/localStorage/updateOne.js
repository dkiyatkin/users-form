export default function updateOne (model, user) {
  localStorage.setItem(model, JSON.stringify(user))
}
