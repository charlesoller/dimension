export const parseChannels = (input: string): string[] => {
  const words = input.split(' ');
  const channels: string[] = [];

  for (let word of words) {
    // Find the last index of '#' in the word
    const lastHashIndex = word.lastIndexOf('#');
    
    // If there's a '#' and it's not the only character in the word
    if (lastHashIndex !== -1 && lastHashIndex < word.length - 1) {
      // Extract the substring starting from the character after the last '#'
      const hashtag = word.substring(lastHashIndex + 1);
      channels.push(hashtag);
    }
  }

  return channels;
}