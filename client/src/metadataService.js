import { parseBlob } from 'music-metadata'

const audioFiles = import.meta.glob('./assets/Audio/*.mp3', { as: 'url' })

export async function metadata() {
  const tracks = []

  const sortedEntries = Object.entries(audioFiles).sort(([a], [b]) =>
    a.localeCompare(b)
  )

  for (const [vitePath, urlLoader] of sortedEntries) {
    const fileUrl = await urlLoader()
    const response = await fetch(fileUrl)
    const blob = await response.blob()
    const metadata = await parseBlob(blob)

    const fileName = vitePath.split('/').pop()

    tracks.push({
      file: fileName,
      src: fileUrl,
      title: metadata.common.title || null,
      artist: metadata.common.artist || null,
      album: metadata.common.album || null
    })
  }
  return tracks
}
