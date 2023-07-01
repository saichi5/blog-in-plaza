import axios from 'axios';

export async function uploadUserImage( formData: FormData )
  : Promise<{url: string} | undefined>{
  if (!formData.has('images')) return {url: ''}

  try {
    const res = await axios.post('/api/user-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;

  } catch (error) {
    throw new Error('uploadUserImage: ' + error);
  }
}
