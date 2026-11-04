/** Save a blob to the visitor's device under the given file name. */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  // Delay the revoke so mobile Safari has time to hand the blob to the OS.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
