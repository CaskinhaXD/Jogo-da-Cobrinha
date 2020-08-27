const can = document.getElementById("canvas");
const c = can.getContext("2d");
const block_Size = 16,
  map_Size = 16,
  size = map_Size * block_Size;

can.width = size;
can.height = size;

c.strokeStyle = "rgb(69, 69, 69)";

let trip = 0,
  x = random_Number(),
  y = random_Number(),
  dirX = 1,
  dirY = 0,
  body = [[0, 0]],
  colour = `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;

function random_Number() {
  return Math.floor(Math.random() * map_Size);
}

Array.prototype.compare = function (a, s) {
  for (let i = s; i < this.length; i++) if (this[i][0] === a[0] && this[i][1] === a[1]) return true;
  return false;
}

function main() {
  c.clearRect(0, 0, can.width, can.height);
  body.unshift([body[0][0] + dirX, body[0][1] + dirY]);
  if (body[0][0] < 0 || body[0][0] >= map_Size || body[0][1] < 0 || body[0][1] >= map_Size || body.compare(body[0], 1)) trip = 1;
  else if (body[0][0] === x && body[0][1] === y) {
    do {
      x = random_Number();
      y = random_Number();
    } while (body.compare([x, y]));
  }
  else body.pop();
  c.fillStyle = "red";
  c.fillRect(x * block_Size, y * block_Size, block_Size, block_Size);
  for (let i = 0; i < body.length; i++) {
    if (!i) c.fillStyle = colour;
    else c.fillStyle = "white";
    c.fillRect(body[i][0] * block_Size, body[i][1] * block_Size, block_Size, block_Size);
    c.strokeRect(body[i][0] * block_Size, body[i][1] * block_Size, block_Size, block_Size);
  }
  if (!trip) setTimeout(main, 150);
}

main();

addEventListener("keyup", function (e) {
  dirX = dirX ? e.key === "d" || e.key === "a" ? dirX : 0 : (e.key === "d" ? 1 : e.key === "a" ? -1 : 0);
  dirY = dirY ? e.key === "w" || e.key === "s" ? dirY : 0 : (e.key === "s" ? 1 : e.key === "w" ? -1 : 0);
});