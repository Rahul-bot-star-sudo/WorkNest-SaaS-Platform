// This automatically reads your folder structure
// No manual updates needed!

export const getNotesStructure = async () => {
  try {
    // Get all subjects from public/notes/
    const subjectsRes = await fetch('/notes/');
    const subjectsText = await subjectsRes.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(subjectsText, 'text/html');
    const links = doc.querySelectorAll('a');
    
    const subjects = [];
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '/' && href !== '../' && href.endsWith('/')) {
        const subject = href.replace('/', '');
        if (!subject.includes('.') && !subject.includes('?')) {
          subjects.push(subject);
        }
      }
    });
    
    const structure = {};
    
    for (const subject of subjects) {
      structure[subject] = {
        name: subject.toUpperCase(),
        topics: {}
      };
      
      // Get topics for this subject
      const topicsRes = await fetch(`/notes/${subject}/`);
      const topicsText = await topicsRes.text();
      const topicsDoc = parser.parseFromString(topicsText, 'text/html');
      const topicLinks = topicsDoc.querySelectorAll('a');
      
      const topics = [];
      topicLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '../' && href.endsWith('/')) {
          topics.push(href.replace('/', ''));
        }
      });
      
      for (const topic of topics) {
        // Get notes for this topic
        const notesRes = await fetch(`/notes/${subject}/${topic}/`);
        const notesText = await notesRes.text();
        const notesDoc = parser.parseFromString(notesText, 'text/html');
        const noteLinks = notesDoc.querySelectorAll('a');
        
        const notes = [];
        noteLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && href !== '../' && href.endsWith('.md')) {
            notes.push(href.replace('.md', ''));
          }
        });
        
        // Format topic name for display
        let displayName = topic;
        if (topic.includes('/')) {
          displayName = topic.split('/').pop();
        }
        
        structure[subject].topics[topic] = {
          name: displayName.replace(/-/g, ' '),
          notes: notes
        };
      }
    }
    
    return structure;
  } catch (error) {
    console.error('Error scanning:', error);
    return {};
  }
};