export default function splitArrayIntoChunks(array) {
  const chunks = [];

  for (let i = 0; i < array.length; i += 3) {
    const chunk = array.slice(i, i + 3);
    chunks.push(chunk);
  }

  return chunks;
}
