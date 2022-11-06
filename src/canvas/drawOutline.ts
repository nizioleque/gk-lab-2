import { Face, ObjectData } from '../types';

export function drawOutlines(
  objectData: ObjectData,
  ctx: CanvasRenderingContext2D
): void {
  objectData.faces.forEach((face, index) => drawFaceOutline(face, ctx, index));
}

export function drawFaceOutline(
  face: Face,
  ctx: CanvasRenderingContext2D,
  index: number
): void {
  ctx.beginPath();
  ctx.lineWidth = 1;
  if (index === 300) ctx.strokeStyle = 'red';
  else ctx.strokeStyle = 'black';
  ctx.moveTo(face.vertices[0].x, face.vertices[0].y);
  for (let i = 1; i < face.vertices.length; i++) {
    ctx.lineTo(face.vertices[i].x, face.vertices[i].y);
  }
  ctx.lineTo(face.vertices[0].x, face.vertices[0].y);
  ctx.stroke();
}
