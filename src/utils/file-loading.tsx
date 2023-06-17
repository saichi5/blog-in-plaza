export async function uploadUserImage( formData: FormData ): Promise<string | undefined> {
  try {
    const res = await fetch('/api/user-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!res.ok){
      throw new Error('Faild to fetch image in uploadUserImage');
    }

    return await res.json();

  } catch (error) {
    console.error('uploadUserImage function: ' + error)
  }
}