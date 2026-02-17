const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

// Dizinleri ve dosya yollarını tanımla
const chaptersDir = path.join(process.cwd(), 'src/content/chapters');
const outputFile = path.join(process.cwd(), 'src/data/chapters.json');

// Markdown dosyalarını işle
function processChapters() {
  // Markdown dosyalarını oku
  const files = fs.readdirSync(chaptersDir).filter(file => file.endsWith('.md'));
  
  const chapters = files.map(filename => {
    const filePath = path.join(chaptersDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Front matter'ı (meta verileri) ve içeriği ayır
    const { data, content } = matter(fileContents);
    
    // Markdown içeriğini HTML'e dönüştür
    const htmlContent = marked.parse(content);
    
    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      number: data.number,
      date: data.date,
      excerpt: data.excerpt || '',
      content: htmlContent
    };
  });
  
  // Bölüm numarasına göre sırala
  chapters.sort((a, b) => a.number - b.number);
  
  // JSON olarak kaydet
  fs.writeFileSync(outputFile, JSON.stringify(chapters, null, 2));
  
  console.log(`${chapters.length} bölüm işlendi ve ${outputFile} dosyasına kaydedildi.`);
}

// src/data dizini yoksa oluştur
const dataDir = path.join(process.cwd(), 'src/data');
if (!fs.existsSync(dataDir)){
  fs.mkdirSync(dataDir, { recursive: true });
}

// Çalıştır
processChapters();