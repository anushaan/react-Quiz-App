
import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://docs.google.com/document/d/e/2PACX-1vSHesOf9hv2sPOntssYrEdubmMQm8lwjfwv6NPjjmIRYs_FOYXtqrYgjh85jBUebK9swPXh_a5TJ5Kl/pub';

async function fetchDocument(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching the document:', error);
    throw error;
  }
}

function parseDocument(html) {
  const $ = cheerio.load(html);
  const data = [];
  
  $('table tr').each((i, row) => {
    $(row).find('td').each((j, cell) => {
      const text = $(cell).text().trim();
      if (text) {
        data.push({ x: j, y: i, char: text });
      }
    });
  });
  
  return data;
}

function printGrid(data) {
  if (data.length === 0) {
    console.log('No data to display.');
    return;
  }

  const maxX = Math.max(...data.map(d => d.x));
  const maxY = Math.max(...data.map(d => d.y));

  const grid = Array.from({ length: maxY + 1 }, () => Array(maxX + 1).fill(' '));

  data.forEach(({ x, y, char }) => {
    grid[y][x] = char;
  });

  grid.forEach(row => {
    console.log(row.join(''));
  });
}

async function main(url) {
  try {
    const html = await fetchDocument(url);
    const data = parseDocument(html);
    printGrid(data);
  } catch (error) {
    console.error('Error processing the document:', error);
  }
}

main(url);

const data = [
  { x: 87, y: 3, char: '█' }, { x: 23, y: 2, char: '░' }, { x: 61, y: 4, char: '█' },
  { x: 2, y: 1, char: '░' }, { x: 65, y: 4, char: '█' }, { x: 31, y: 5, char: '░' },
  { x: 30, y: 6, char: '░' }, { x: 20, y: 4, char: '█' }, { x: 35, y: 1, char: '█' },
  { x: 2, y: 6, char: '█' }, { x: 52, y: 1, char: '█' }, { x: 12, y: 0, char: '█' },
  { x: 66, y: 6, char: '█' }, { x: 69, y: 4, char: '█' }, { x: 85, y: 0, char: '█' },
  { x: 55, y: 6, char: '█' }, { x: 77, y: 3, char: '█' }, { x: 9, y: 0, char: '█' },
  { x: 53, y: 6, char: '█' }, { x: 5, y: 3, char: '█' }, { x: 44, y: 3, char: '░' },
  { x: 40, y: 3, char: '█' }, { x: 14, y: 0, char: '█' }, { x: 0, y: 5, char: '█' },
  { x: 60, y: 0, char: '░' }, { x: 14, y: 3, char: '█' }, { x: 22, y: 1, char: '█' },
  { x: 26, y: 6, char: '█' }, { x: 66, y: 2, char: '█' }, { x: 29, y: 5, char: '█' },
  { x: 8, y: 0, char: '█' }, { x: 80, y: 5, char: '░' }, { x: 34, y: 5, char: '█' },
  { x: 8, y: 3, char: '░' }, { x: 87, y: 1, char: '█' }, { x: 47, y: 6, char: '█' },
  { x: 6, y: 0, char: '█' }, { x: 45, y: 1, char: '█' }, { x: 45, y: 2, char: '█' },
  { x: 29, y: 1, char: '█' }, { x: 65, y: 6, char: '█' }, { x: 52, y: 2, char: '█' },
  { x: 6, y: 3, char: '█' }, { x: 2, y: 4, char: '░' }, { x: 58, y: 0, char: '█' },
  { x: 66, y: 1, char: '█' }, { x: 16, y: 0, char: '█' }, { x: 54, y: 3, char: '░' },
  { x: 24, y: 6, char: '█' }, { x: 67, y: 1, char: '░' }, { x: 9, y: 6, char: '█' },
  { x: 62, y: 2, char: '█' }, { x: 44, y: 0, char: '█' }, { x: 21, y: 4, char: '█' },
  { x: 62, y: 5, char: '░' }, { x: 15, y: 6, char: '█' }, { x: 0, y: 0, char: '█' },
  { x: 4, y: 0, char: '█' }, { x: 70, y: 2, char: '█' }, { x: 63, y: 4, char: '░' },
  { x: 78, y: 1, char: '█' }, { x: 81, y: 0, char: '█' }, { x: 87, y: 0, char: '░' },
  { x: 2, y: 2, char: '░' }, { x: 16, y: 4, char: '░' }, { x: 36, y: 4, char: '░' },
  { x: 43, y: 3, char: '█' }, { x: 68, y: 2, char: '█' }, { x: 18, y: 6, char: '░' },
  { x: 4, y: 3, char: '█' }, { x: 62, y: 3, char: '█' }, { x: 30, y: 0, char: '█' },
  { x: 79, y: 1, char: '█' }, { x: 75, y: 6, char: '█' }, { x: 53, y: 4, char: '█' },
  { x: 24, y: 0, char: '█' }, { x: 54, y: 2, char: '░' }, { x: 22, y: 3, char: '░' },
  { x: 79, y: 5, char: '█' }, { x: 67, y: 6, char: '█' }, { x: 25, y: 0, char: '█' },
  { x: 56, y: 0, char: '█' }, { x: 87, y: 4, char: '█' }, { x: 2, y: 3, char: '█' },
  { x: 1, y: 0, char: '█' }, { x: 55, y: 0, char: '█' }, { x: 72, y: 1, char: '█' },
  { x: 79, y: 4, char: '░' }, { x: 42, y: 3, char: '█' }, { x: 37, y: 2, char: '░' },
  { x: 79, y: 2, char: '░' }, { x: 22, y: 4, char: '█' }, { x: 88, y: 4, char: '█' },
  { x: 1, y: 1, char: '█' }, { x: 46, y: 4, char: '█' }, { x: 66, y: 3, char: '█' },
  { x: 30, y: 5, char: '█' }, { x: 14, y: 1, char: '█' }, { x: 39, y: 3, char: '█' },
  { x: 67, y: 2, char: '░' }, { x: 1, y: 5, char: '█' }, { x: 89, y: 1, char: '░' },
  { x: 46, y: 0, char: '░' }, { x: 70, y: 1, char: '█' }, { x: 35, y: 3, char: '█' },
  { x: 73, y: 5, char: '█' }, { x: 7, y: 3, char: '█' }, { x: 52, y: 0, char: '█' },
  { x: 81, y: 6, char: '█' }, { x: 47, y: 1, char: '░' }, { x: 38, y: 0, char: '░' },
  { x: 78, y: 4, char: '█' }, { x: 54, y: 4, char: '░' }, { x: 53, y: 5, char: '█' },
  { x: 38, y: 1, char: '█' }, { x: 15, y: 5, char: '█' }, { x: 66, y: 4, char: '█' },
  { x: 31, y: 1, char: '░' }, { x: 33, y: 6, char: '█' }, { x: 43, y: 4, char: '█' },
  { x: 34, y: 3, char: '█' }, { x: 80, y: 6, char: '█' }, { x: 82, y: 6, char: '█' },
  { x: 65, y: 5, char: '█' }, { x: 67, y: 0, char: '░' }, { x: 25, y: 6, char: '█' },
  { x: 44, y: 2, char: '░' }, { x: 36, y: 2, char: '█' }, { x: 21, y: 2, char: '█' },
  { x: 75, y: 0, char: '░' }, { x: 86, y: 0, char: '█' }, { x: 18, y: 0, char: '█' },
  { x: 46, y: 3, char: '█' }, { x: 73, y: 0, char: '█' }, { x: 7, y: 0, char: '█' },
  { x: 72, y: 5, char: '█' }, { x: 53, y: 1, char: '█' }, { x: 17, y: 0, char: '█' },
  { x: 34, y: 6, char: '█' }, { x: 54, y: 6, char: '█' }, { x: 41, y: 4, char: '█' },
  { x: 0, y: 4, char: '█' }, { x: 23, y: 5, char: '█' }, { x: 60, y: 1, char: '█' },
  { x: 15, y: 2, char: '█' }, { x: 83, y: 6, char: '█' }, { x: 73, y: 6, char: '█' },
  { x: 62, y: 4, char: '█' }, { x: 89, y: 3, char: '░' }, { x: 86, y: 6, char: '█' },
  { x: 49, y: 4, char: '░' }, { x: 86, y: 5, char: '█' }, { x: 63, y: 3, char: '░' },
  { x: 73, y: 1, char: '█' }, { x: 2, y: 5, char: '░' }, { x: 16, y: 5, char: '░' },
  { x: 67, y: 4, char: '░' }, { x: 30, y: 1, char: '█' }, { x: 10, y: 0, char: '█' },
  { x: 15, y: 1, char: '█' }, { x: 7, y: 6, char: '█' }, { x: 61, y: 5, char: '█' },
  { x: 61, y: 1, char: '█' }, { x: 83, y: 0, char: '█' }, { x: 36, y: 0, char: '█' },
  { x: 39, y: 1, char: '░' }, { x: 50, y: 6, char: '░' }, { x: 47, y: 4, char: '█' },
  { x: 71, y: 5, char: '█' }, { x: 56, y: 6, char: '█' }, { x: 14, y: 4, char: '█' },
  { x: 78, y: 3, char: '█' }, { x: 21, y: 5, char: '█' }, { x: 8, y: 6, char: '█' },
  { x: 66, y: 5, char: '█' }, { x: 52, y: 3, char: '█' }, { x: 22, y: 5, char: '█' },
  { x: 42, y: 4, char: '█' }, { x: 13, y: 0, char: '█' }, { x: 6, y: 6, char: '█' },
  { x: 43, y: 2, char: '█' }, { x: 65, y: 2, char: '█' }, { x: 44, y: 1, char: '█' },
  { x: 29, y: 0, char: '█' }, { x: 67, y: 5, char: '░' }, { x: 23, y: 4, char: '░' },
  { x: 24, y: 1, char: '░' }, { x: 60, y: 5, char: '█' }, { x: 66, y: 0, char: '█' },
  { x: 44, y: 4, char: '░' }, { x: 39, y: 2, char: '█' }, { x: 88, y: 2, char: '█' },
  { x: 4, y: 6, char: '░' }, { x: 52, y: 6, char: '█' }, { x: 48, y: 6, char: '█' },
  { x: 45, y: 0, char: '█' }, { x: 5, y: 0, char: '█' }, { x: 79, y: 6, char: '█' },
  { x: 35, y: 5, char: '█' }, { x: 27, y: 6, char: '█' }, { x: 57, y: 6, char: '█' },
  { x: 84, y: 0, char: '█' }, { x: 22, y: 2, char: '░' }, { x: 0, y: 3, char: '█' },
  { x: 33, y: 5, char: '█' }, { x: 74, y: 6, char: '█' }, { x: 58, y: 6, char: '█' },
  { x: 39, y: 4, char: '█' }, { x: 87, y: 6, char: '░' }, { x: 24, y: 5, char: '█' },
  { x: 1, y: 3, char: '█' }, { x: 46, y: 2, char: '█' }, { x: 89, y: 5, char: '░' },
  { x: 3, y: 3, char: '█' }, { x: 5, y: 6, char: '█' }, { x: 43, y: 5, char: '░' },
  { x: 42, y: 2, char: '█' }, { x: 41, y: 5, char: '█' }, { x: 28, y: 6, char: '█' },
  { x: 61, y: 2, char: '█' }, { x: 38, y: 2, char: '░' }, { x: 87, y: 5, char: '█' },
  { x: 68, y: 4, char: '█' }, { x: 10, y: 6, char: '░' }, { x: 16, y: 6, char: '█' },
  { x: 14, y: 5, char: '█' }, { x: 0, y: 6, char: '░' }, { x: 37, y: 3, char: '░' },
  { x: 89, y: 2, char: '░' }, { x: 48, y: 3, char: '█' }, { x: 17, y: 6, char: '█' },
  { x: 36, y: 3, char: '░' }, { x: 48, y: 4, char: '█' }, { x: 46, y: 1, char: '█' },
  { x: 59, y: 6, char: '█' }, { x: 52, y: 5, char: '█' }, { x: 77, y: 1, char: '█' },
  { x: 35, y: 6, char: '█' }, { x: 74, y: 0, char: '█' }, { x: 35, y: 2, char: '█' },
  { x: 15, y: 3, char: '█' }, { x: 72, y: 0, char: '░' }, { x: 23, y: 0, char: '█' },
  { x: 79, y: 3, char: '░' }, { x: 49, y: 5, char: '░' }, { x: 23, y: 1, char: '█' },
  { x: 82, y: 0, char: '█' }, { x: 21, y: 3, char: '░' }, { x: 20, y: 3, char: '█' },
  { x: 59, y: 0, char: '█' }, { x: 54, y: 1, char: '░' }, { x: 36, y: 5, char: '░' },
  { x: 12, y: 6, char: '█' }, { x: 89, y: 4, char: '░' }, { x: 86, y: 1, char: '█' },
  { x: 57, y: 0, char: '█' }, { x: 14, y: 2, char: '█' }, { x: 65, y: 0, char: '█' },
  { x: 78, y: 2, char: '█' }, { x: 42, y: 5, char: '█' }, { x: 29, y: 6, char: '░' },
  { x: 16, y: 3, char: '░' }, { x: 1, y: 6, char: '█' }, { x: 80, y: 0, char: '█' },
  { x: 65, y: 3, char: '█' }, { x: 37, y: 1, char: '█' }, { x: 54, y: 5, char: '░' },
  { x: 70, y: 4, char: '█' }, { x: 84, y: 6, char: '█' }, { x: 40, y: 2, char: '░' },
  { x: 88, y: 3, char: '█' }, { x: 47, y: 3, char: '█' }, { x: 23, y: 6, char: '░' },
  { x: 28, y: 0, char: '█' }, { x: 15, y: 0, char: '█' }, { x: 77, y: 4, char: '█' },
  { x: 53, y: 2, char: '█' }, { x: 35, y: 4, char: '█' }, { x: 1, y: 4, char: '█' },
  { x: 87, y: 2, char: '█' }, { x: 88, y: 1, char: '█' }, { x: 34, y: 4, char: '█' },
  { x: 47, y: 2, char: '░' }, { x: 54, y: 0, char: '█' }, { x: 78, y: 5, char: '█' },
  { x: 0, y: 1, char: '█' }, { x: 61, y: 3, char: '█' }, { x: 20, y: 2, char: '█' },
  { x: 69, y: 3, char: '░' }, { x: 62, y: 1, char: '█' }, { x: 63, y: 2, char: '░' },
  { x: 67, y: 3, char: '█' }, { x: 72, y: 6, char: '█' }, { x: 36, y: 1, char: '█' },
  { x: 0, y: 2, char: '█' }, { x: 41, y: 3, char: '░' }, { x: 49, y: 6, char: '█' },
  { x: 14, y: 6, char: '█' }, { x: 15, y: 4, char: '█' }, { x: 47, y: 5, char: '█' },
  { x: 2, y: 0, char: '█' }, { x: 88, y: 5, char: '█' }, { x: 43, y: 1, char: '█' },
  { x: 26, y: 0, char: '█' }, { x: 71, y: 4, char: '█' }, { x: 71, y: 1, char: '█' },
  { x: 53, y: 0, char: '█' }, { x: 16, y: 2, char: '░' }, { x: 40, y: 5, char: '█' },
  { x: 77, y: 5, char: '█' }, { x: 3, y: 0, char: '█' }, { x: 37, y: 0, char: '█' },
  { x: 53, y: 3, char: '█' }, { x: 65, y: 1, char: '█' }, { x: 77, y: 2, char: '█' },
  { x: 70, y: 5, char: '█' }, { x: 79, y: 0, char: '█' }, { x: 68, y: 3, char: '█' },
  { x: 3, y: 6, char: '█' }, { x: 60, y: 6, char: '█' }, { x: 52, y: 4, char: '█' },
  { x: 80, y: 1, char: '░' }, { x: 13, y: 6, char: '█' }, { x: 16, y: 1, char: '░' },
  { x: 48, y: 5, char: '█' }, { x: 85, y: 6, char: '█' }, { x: 40, y: 4, char: '█' },
  { x: 21, y: 1, char: '░' }, { x: 71, y: 2, char: '█' }, { x: 69, y: 2, char: '█' },
  { x: 1, y: 2, char: '░' }, { x: 27, y: 0, char: '█' }
];

const maxX = Math.max(...data.map(point => point.x));
const maxY = Math.max(...data.map(point => point.y));

const grid = Array.from({ length: maxY + 1 }, () => Array(maxX + 1).fill(' '));

data.forEach(point => {
  grid[point.y][point.x] = point.char;
});

const message = grid.map(row => row.join('')).join('\n');
console.log(message);


