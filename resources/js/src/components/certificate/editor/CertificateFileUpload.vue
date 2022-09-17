<template>
    <vs-row class="certificate-file-upload">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" style="position: relative;">
            <vs-card class="cstm-card collapse-cstm-card">
                <div class="collapse-item">
                    <div class="collapseContent">
                        <div class="cstm_vuefileagent_holder" :class="edit ? 'pt-100' : ''">
                            <VueFileAgent @change="fileCrop($event)" multiple="false" ref="vueFileAgent" theme="grid"
                                :deletable="true" :meta="true" :accept="imagevalidation" :maxSize="'10000MB'"
                                :linkable="true" :helpText="imageHint" :errorText="{
                                    type: 'Invalid file type. Only images Allowed',
                                    size: 'Files should not exceed 10MB in size',
                                }" class="chat-vue-file-agent" @select="filesSelected($event)"
                                @beforedelete="onBeforeDelete($event)" @delete="fileDeleted($event)"
                                v-model="fileRecords" @upload:error="
                                    uploadEvent('upload:error', $event)
                                "></VueFileAgent>
                        </div>
                    </div>
                </div>
            </vs-card>
            <div class="vs-component con-vs-popup vs-popup-primary cstm-modal-popup" v-if="uploadmodal"
                :class="{ show: uploadmodal }">
                <div class="cstm-modal md:w-2/3 w-full">
                    <div class="header">
                        <h3>Uploaded Template</h3>
                        <button @click="uploadmodal = false" class="close-modal">
                            &times;
                        </button>
                    </div>
                    <form data-vv-scope="image">
                        <div class="modal-content p-4">
                            <div>
                                <cropper @change="onChange" :src="imageDataUrl" :stencil-props="{
                                    handlers: {},
                                    movable: false,
                                    scalable: false,
                                }" image-restriction="stencil" />
                            </div>
                            <span v-show="errors.has('image.Image Name')" class="text-danger">
                                {{errors.first('image.Image Name')}}
                            </span>
                            <vs-button @click="uploadFiles()" class="m-2">
                                Upload & Save
                            </vs-button>
                        </div>
                    </form>
                </div>
            </div>
        </vs-col>
    </vs-row>
</template>

<script>
import {
    getUploadedFilesId,
    saveUploadFileApi,
    UploadImage,
} from "../../../axios"

export default {
    name: "CertificateFileUpload",
    props: {
        file_repository_id: {
            required: false,
            type: Number,
            default: 0,
        },
        edit: {
            required: false,
            type: Boolean,
        },
        filesInfo: {
            required: false,
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            multipleSelect: false,
            isBrowseContent: false,
            width: "1123px",
            imageDataUrl: null,
            deletedIndex: null,
            uploadmodal: false,
            imageHint: "Choose files or drag & drop here",
            imagevalidation: "image/*",
            auto: true,
            fileRecords: [],
            uploadUrl: "",
            ///file/upload/${platform_customer_id}
            uploadHeaders: {
                "X-Test-Header": "vue-file-agent",
                Authorization: "",
            },
            fileRecordsForUpload: [],
            cropImage: null,
            importedFileData: [], // maintain an upload queue
        }
    },
    // config.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`

    async created() {
        const customer_id = "184"
        const imageUploadUrl =
            "https://scoolio-backend-dev.track-progress.com/api/file/upload/"
        this.uploadUrl = `${imageUploadUrl}${customer_id}`
        this.uploadHeaders.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjNiOGQxOWM3ODQwZTA4NWI1MGI1MWE4MmI1N2VkOWMzMjUwZjNiM2Q5MTVjMjkzOWNhMjcyYTQzODZlOTk5OTY2NThlYmQ5MDc3NTIyN2I4IiwiaWF0IjoxNjYxMzgzMzM0LCJuYmYiOjE2NjEzODMzMzQsImV4cCI6MTY5MjkxOTMzNCwic3ViIjoiMTQ1MCIsInNjb3BlcyI6W119.korUh7_N7LwuWU9WsNjJtKocLmJKUcQy5qwm809M7X_DLag7QH_LvDp7vtV295vJojqDIBVwQat1Mg7uUkJSLmQh8qryH2Ht88B6dqQuOjVtwiGgZMww-9USmmScCd4u3d1cNQ-8JMmjgXTy3o4Xduv0MxVBvT65AXjKeEjRaxk_MooTlq5qFAScEc4QC8YeV20mAr4AqsfnrZ-NGQ243zEy8qMyyaIwtwniuDRbs_84U1HP6CoVOMNJULwd2WGSftpYfMB8oMspPmvVlg-KE_NxNFJngdinyz2cP_-NBc3YPvbgabac1gywrlZo5yE0qE8CjA8u-6_8O15sCssdeaCzIgHFz4FPMJxZ_J8tph9rRga1fPCNKlBAZWEWlcIY28zQGQhM8qLTiiE3Dlbr1CuiTGWrPgQ1r2DlsplFGsLLJkRAOvknwsSi8L9a-DnETINSJnUNvKI0-JRoOOx0XB-rYt__3Ft5kbILSE7geebzx3VZaEBQKpyEvzyE4x9ZeBFg7EJ58IHgKxaSI37OB2CEhNwCalGS7g_i2rUaWFNpVVJqDrS9Np1EhjnExoRq2b_OsLVFterOSlymyjd5j3mrzNH6GX_zemUgHezjbHHpeTFHHRcIel-6hr2Ww_86v4aUY5saQyAw3binALGPhJkg_palVmlaDzrDFNJvtvU`
    },
    mounted() { },
    methods: {
        onChange({ canvas }) {
            // const imageToUpload = canvas.toDataURL();
            canvas.toBlob((blob) => {
                const fd = new FormData()
                fd.append("files[]", blob, "image.jpg")
                fd.append("upload_path", "ads")
                this.cropImage = fd
            })
        },
        async fileCrop(e) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                let data = null
                if (typeof e.target.result === "object") {
                    data = window.URL.createObjectURL(
                        new Blob([e.target.result])
                    )
                } else {
                    data = e.target.result
                }
                this.imageDataUrl = data
            }
            reader.readAsArrayBuffer(file)
        },
        async SaveuploadedSFiles(type) {
            if (type === "drive") {
                const payload = {
                    file_id: this.filesInfo.file.files_id,
                    customer_id: "184",
                    name: this.filesInfo.file.file_name,
                }
                const { data } = await saveUploadFileApi(payload)
                this.uploadmodal = false
                this.$emit("image", data.data.certficate_image)
            } else if (type === "system") {
                const payload = {
                    file_id: this.fileRecords[0].files_id,
                    customer_id: "184",
                    name: this.fileRecords[0].file_name,
                }
                const { data } = await saveUploadFileApi(payload)
                this.isBrowseContent = false
                this.$emit("image", data.data.certficate_image)
            } else {
                const payload = {
                    file_id: this.filesInfo.file.files_id,
                    customer_id: "184",
                    name: this.filesInfo.file.file_name,
                }
                const { data } = await saveUploadFileApi(payload)
                this.uploadmodal = false
                this.$emit("image", data.data.certficate_image)
            }
        },
        uploadEvent(eventName, data) { },
        async uploadFiles() {
            const result = await this.$validator.validateAll("image")
            if (result) {
                const payload = "184"
                const data = await UploadImage(this.cropImage, payload)

                // this.$vs.loading({
                //   type: 'material',
                //   text: 'Please Wait We Are Uploading Files'
                // })

                const cdn = data.data.data.cdn

                const file_name = data.data.data.files[0].file_name
                const file_path = data.data.data.files[0].file_path

                const raw = JSON.stringify({
                    file_repository_id: this.file_repository_id,
                    files: [
                        {
                            file_name,
                            file_path: `${cdn}${file_path}`,
                        },
                    ],
                })

                const file_id_payload = raw

                this.getUploadFiles(file_id_payload)
                this.imageDataUrl = null

                this.fileRecords = []
                this.fileRecordsForUpload = []
            }
        },
        deleteUploadedFile() {
            if (
                this.section_type === "courseHeader" ||
                this.section_type === "CourseComponent"
            ) {
                this.$emit("deletedIndex", this.deletedIndex)
            }
        },
        filesSelected(fileRecordsNewlySelected) {
            const validFileRecords = fileRecordsNewlySelected.filter(
                (fileRecord) => !fileRecord.error
            )
            this.fileRecordsForUpload =
                this.fileRecordsForUpload.concat(validFileRecords)
            this.uploadmodal = true
        },
        onBeforeDelete(fileRecord) {
            const i = this.fileRecordsForUpload.indexOf(fileRecord)
            if (i !== -1) {
                // queued file, not yet uploaded. Just remove from the arrays
                this.fileRecordsForUpload.splice(i, 1)
                const k = this.fileRecords.indexOf(fileRecord)
                if (k !== -1) this.fileRecords.splice(k, 1)
            } else {
                this.$vs.dialog({
                    type: "confirm",
                    color: "danger",
                    title: "Please Confirm",
                    text: "Are you sure you want to delete this file?",
                    accept: this.acceptAlert,
                    parameters: fileRecord,
                })
            }
        },
        acceptAlert(fileRecord) {
            const index = this.fileRecords.indexOf(fileRecord)

            this.deletedIndex = index

            this.$refs.vueFileAgent.deleteFileRecord(fileRecord) // will trigger 'delete' event

            // this.$refs.vueFileAgent.deleteFileRecord(fileRecord) // will trigger 'delete' event
        },
        fileDeleted(fileRecord) {
            const i = this.fileRecordsForUpload.indexOf(fileRecord)
            if (i !== -1) {
                this.fileRecordsForUpload.splice(i, 1)
            } else {
                this.deleteUploadedFile(fileRecord)
            }
        },
        async getUploadFiles(file_id_payload, type = "system") {
            const res = await getUploadedFilesId(file_id_payload)

            if (res.data.message === "files.createFile") {
                /* const newRecord = this.generateFileForVueAgent(response[i].data.data.files[0])

               */
                const file = {
                    file: res.data.data.files[0],
                }
                this.filesInfo = file
                const filesDriveInfo = res.data.data.files
                let filesDrive = []
                if (type === "drive") {
                    filesDrive = filesDriveInfo.map((ele) => {
                        return {
                            name: ele.file_name,
                            sizeText: this.bytesToSize(ele.size),
                            size: ele.size,
                            type: ele.file_type,
                            url: ele.file_path,
                            color: "green",
                            upload: {
                                data: true,
                                error: false,
                            },
                        }
                    })
                    this.fileRecords = filesDrive
                    this.$vs.notify({
                        title: "Success",
                        text: "File Uploaded Successfully",
                        iconPack: "feather",
                        icon: "icon-alert-circle",
                        color: "success",
                        time: 1000,
                    })
                    this.SaveuploadedSFiles("drive")
                } else {
                    const file_id = res.data.data.files[0].files_id
                    this.$vs.notify({
                        title: "Success",
                        text: "File Uploaded Successfully",
                        iconPack: "feather",
                        icon: "icon-alert-circle",
                        color: "success",
                        time: 1000,
                    })
                    this.SaveuploadedSFiles("upload")
                }

                //

                // const fileIdObject = {
                //   question_index:this.question_detail_index,
                //   file_id
                // }

                this.$vs.loading.close()

                if (type === "drive") {
                    const fileIdObject = {
                        file_id: filesDriveInfo.map((ele) => ele.files_id),
                    }

                    this.$emit("getFileId", fileIdObject)
                }

                //section type checking
            }
        },
        bytesToSize(bytes) {
            const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
            if (bytes === 0) return "n/a"
            const i = parseInt(
                Math.floor(Math.log(bytes) / Math.log(1024)),
                10
            )
            if (i === 0) return `${bytes} ${sizes[i]})`
            return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
        },

        generateFileForVueAgent(ele) {
            return {
                file_id: ele.file.id,
                name: ele.file.file_name,
                sizeText: this.bytesToSize(ele.file.size),
                size: ele.file.size,
                type: ele.file.file_type,
                url: ele.file.file_path,
                upload: {
                    data: true,
                    error: false,
                },
            }
        },
    },
}
</script>
<style lang="scss">
.childImportPopUp {
    z-index: 53001;
}

.pt-100 {
    padding-top: 100px;
}

.file-preview {
    .help-text {
        display: none !important;
    }
}
</style>
