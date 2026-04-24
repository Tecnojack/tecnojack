export function optimizeImage(url: string, width = 400): string {
  if (!url) return url;
  return url.includes('=w')
    ? url.replace(/=w\d+/, `=w${width}`)
    : `${url}=w${width}`;
}

export async function decodeImage(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  const bitmap = await createImageBitmap(blob);

  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext('2d');
  ctx?.drawImage(bitmap, 0, 0);

  return canvas.toDataURL('image/webp', 0.7);
}
