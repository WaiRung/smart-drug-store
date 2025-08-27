export default function (drugObject: Object) {
    const keysToOmit = ['documentId', 'createdAt', 'updatedAt', 'publishedAt', 'selected', 'isValid']
    return Object.fromEntries(
        Object.entries(drugObject).filter(([key]) => !keysToOmit.includes(key))
    )
}