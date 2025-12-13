import {
  Box,
  FileUpload,
  type FileUploadRootProviderProps,
  Icon,
} from "@chakra-ui/react";
import { UploadIcon } from "lucide-react";

//------------------------------------------------------------------------------
// Dropzone
//------------------------------------------------------------------------------

export type DropzoneProps = FileUploadRootProviderProps & {
  description: string;
  limits: string;
};

export default function Dropzone({
  description,
  limits,
  ...rest
}: DropzoneProps) {
  return (
    <FileUpload.RootProvider alignItems="stretch" {...rest}>
      <FileUpload.HiddenInput />

      <FileUpload.Dropzone minH="10em">
        <Icon color="fg.muted" size="md">
          <UploadIcon />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box>{description}</Box>
          <Box color="fg.muted">{limits}</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>

      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item file={file} key={file.name}>
                <FileUpload.ItemPreview />
                <FileUpload.ItemName flex={1} />
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger />
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
    </FileUpload.RootProvider>
  );
}
