export default function (drugObject: Object) {
    const keysToOmit = ['id', 'createdAt', 'updatedAt', 'publishedAt', 'selected', 'isValid']
    return Object.fromEntries(
        Object.entries(drugObject).filter(([key]) => !keysToOmit.includes(key))
    )
}