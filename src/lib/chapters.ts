import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Bölümlerin bulunduğu dizin
const chaptersDirectory = path.join(process.cwd(), 'src/content/chapters');

export type Chapter = {
  slug: string;
  title: string;
  number: number;
  date: string;
  excerpt: string;
  content?: string;
};

// Tüm bölümleri yükle
export function getChapters(): Chapter[] {
  // Eğer dizin yoksa, boş bir dizi döndür
  if (!fs.existsSync(chaptersDirectory)) {
    return [];
  }

  // Tüm .md dosyalarını oku
  const filenames = fs.readdirSync(chaptersDirectory);
  const mdFiles = filenames.filter(file => file.endsWith('.md'));
  
  const chapters = mdFiles.map(filename => {
    const filePath = path.join(chaptersDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Front matter meta verilerini çıkar
    const { data } = matter(fileContents);
    
    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title || 'Untitled Chapter',
      number: data.number || 0,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || 'No excerpt available.',
    };
  });
  
  // Bölüm numarasına göre sırala (büyükten küçüğe)
  return chapters.sort((a, b) => b.number - a.number);
}

// En son eklenen bölümleri getir (belirtilen sayıda)
export function getLatestChapters(count: number = 3): Chapter[] {
  const allChapters = getChapters();
  // Bölümler zaten büyükten küçüğe sıralanmış olacak
  return allChapters.slice(0, count);
}

// Tek bir bölümü yükle
export function getChapter(slug: string): Chapter & { content: string } | null {
  try {
    const filePath = path.join(chaptersDirectory, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title || 'Untitled Chapter',
      number: data.number || 0,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || 'No excerpt available.',
      content: content || '',
    };
  } catch (error) {
    console.error(`Error loading chapter ${slug}:`, error);
    return null;
  }
}