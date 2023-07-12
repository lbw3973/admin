import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftjsToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { EditorProps } from "react-draft-wysiwyg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const Editor = dynamic<EditorProps>(() => import("react-draft-wysiwyg").then(mod => mod.Editor), {
  ssr: false,
});

function ContentEditor({
  initialState,
  setContentState,
}: {
  initialState?: string;
  setContentState: Dispatch<SetStateAction<any>>;
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const updateTextDescription = (state: EditorState) => {
    setEditorState(state);
    const html = draftjsToHtml(convertToRaw(state.getCurrentContent()));
    setContentState((prevState: any) => ({ ...prevState, content: html }));
  };

  useEffect(() => {
    if (!initialState) return;
    const blocksFromHtml = htmlToDraft(initialState);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, []);

  return (
    <Editor
      toolbar={{
        options: ["inline", "fontSize", "fontFamily", "list", "textAlign"],
      }}
      placeholder="게시글을 작성해주세요"
      editorState={editorState}
      onEditorStateChange={updateTextDescription}
      localization={{ locale: "ko" }}
      editorStyle={{
        height: "540px",
        width: "100%",
        padding: "10px 20px",
      }}
    />
  );
}

export default ContentEditor;
