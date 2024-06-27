export default function (drugKey: String) {
  let returnThaiKey = ''
  if (!drugKey) {
    return returnThaiKey
  }
  switch (drugKey) {
    case 'Name':
      returnThaiKey = 'ชื่อยา'
      break;
    case 'Indication':
      returnThaiKey = 'ข้อบ่งใช้'
      break;
    case 'Consumation':
      returnThaiKey = 'วิธีรับประทาน'
      break;
    case 'ADR':
      returnThaiKey = 'อาการไม่พึงประสงค์'
      break;
    case 'DrugInteraction':
      // returnThaiKey = 'อันตรกิริยาระหว่างยา - ยา'
      returnThaiKey = 'อันตรกิริยาระหว่างยา'
      break;
    default:
      returnThaiKey = `add more key to translate at drug-key-translate util for key ${drugKey}`
  }
  return returnThaiKey

}