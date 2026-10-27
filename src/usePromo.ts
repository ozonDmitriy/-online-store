export async function fetchPromos() {
  const errMessage = 'Ошибка загрузки'
  const API_URL = 'https://api.dev.cwe.su/api/promos/?populate=*'

  try {
    const res = await fetch(API_URL)

    if (!res.ok) {
      throw new Error(`${errMessage}: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error('fetchPromos error:', error)
    return []
  }
}
