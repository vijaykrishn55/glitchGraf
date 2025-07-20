export const uploadGlitch = async (file, userId) => {
  const response = await cloudinary.uploader.unsigned_upload(
    file,
    'glitch_3d_models', // Your preset name
    {
      resource_type: 'auto',
      folder: `glitch-art/user-uploads/${userId}`, // Optional user subfolders
      discard_original_filename: false // Preserve original filenames
    }
  );
  return response.secure_url;
};