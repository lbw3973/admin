import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addPhoto } from "@/app/apis/notice";

function ContentEditor({
  initialState,
  updateContent,
}: {
  initialState: string;
  updateContent: (data: string) => void;
}) {
  type CustomUploadAdapter = {
    upload: () => Promise<{ default: string }>;
  };

  function customUploadAdapter(loader: any): CustomUploadAdapter {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file: any) => {
            formData.append("photo", file);

            addPhoto(formData)
              .then((res: any) => {
                resolve({
                  default: res.path,
                });
              })
              .catch((err: any) => reject(err));
          });
        });
      },
    };
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
      return customUploadAdapter(loader);
    };
  }
  console.log(initialState);
  return (
    <div className="mb-10">
      <CKEditor
        editor={ClassicEditor}
        config={{
          initialData: initialState,
          language: "ko",
          extraPlugins: [uploadPlugin],
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "fontSize",
              "bold",
              "italic",
              "|",
              "link",
              "uploadImage",
              "blockQuote",
              "codeBlock",
              "|",
              "bulletedList",
              "numberedList",
            ],
            shouldNotGroupWhenFull: false,
          },
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          updateContent(data);
        }}
      />
    </div>
  );
}

export default ContentEditor;
