import { addFile, repoDetails, saveFile } from "../axios"

export default {
  methods: {
    async addUploadedFile (uploadedFile) {
      const res = await addFile(uploadedFile)
      
      if ((res.data.message === 'files.createFile')) {
        return saveFile(184, res.data.data.files[0].files_id, res.data.data.files[0].file_name)
      }
    },
    createFormData() {
      const formData = new FormData()
      console.log(this.uploadedImage)
      formData.append('files[]', this.uploadedImage) // this is important! - the actual file for upload
      formData.append('upload_path', 'ads')
      return formData // edit: fixed. Thanks to Chauhan-Nitesh for the comment below
    },
  }
}