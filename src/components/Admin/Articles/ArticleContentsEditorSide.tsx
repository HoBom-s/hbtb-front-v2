import { ChangeEvent, MutableRefObject } from "react";

// chakra
import {
  Box,
  Heading,
  Input,
  InputGroup,
  Button,
  Icon,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

// icons
import { FiFile } from "react-icons/fi";

// components
import { RenderProps, TagItem } from "@/components";

// type
import type { Tag } from "@/types";
import type { Form } from "@/hooks";

interface ArticleContentsEditorSideProps {
  tags: Tag[];

  clickedTag: Tag[];

  fileInputRef: MutableRefObject<HTMLInputElement | null>;

  formValue: Form;

  onTagItemClickEvent: (tag: Tag) => void;

  onTumbnailUploadClickEvent: () => void;

  onFileInputChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;

  onPostButtonClickEvent: () => void;

  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ArticleContentsEditorSide = ({
  tags,
  clickedTag,
  fileInputRef,
  formValue,
  onTagItemClickEvent,
  onTumbnailUploadClickEvent,
  onFileInputChangeEvent,
  onPostButtonClickEvent,
  onFormValueChangeEvent,
}: ArticleContentsEditorSideProps) => {
  return (
    <Box>
      <Box minW="280px" w="100%" maxW="280px">
        <Box mb="30px">
          <FormControl
            isRequired
            isInvalid={!formValue.path.validate(formValue.path.value)}
          >
            <FormLabel as="b" mb="10px" fontSize="xl">
              Path
            </FormLabel>
            <Input
              name="path"
              type={formValue.path.type}
              placeholder={formValue.path.placeholder}
              value={formValue.path.value}
              onChange={onFormValueChangeEvent}
            />
            {!formValue.path.validate(formValue.path.value) && (
              <FormErrorMessage>{formValue.path.errorMessage}</FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Box mb="30px">
          <Heading mb="10px" fontSize="xl">
            Tags
          </Heading>
          <Box
            sx={{
              ".tag-item-list": {
                display: "flex",
                alignItems: "center",
                gap: "4px",
                flexWrap: "wrap",
              },
            }}
          >
            <RenderProps
              className="tag-item-list"
              items={tags}
              render={(tag: Tag) => {
                return (
                  <TagItem
                    tag={tag}
                    outlined={
                      clickedTag.find((cTag: Tag) => cTag._id === tag._id)
                        ? false
                        : true
                    }
                    onTagItemClickEvent={onTagItemClickEvent}
                  />
                );
              }}
            />
          </Box>
        </Box>
        <Box mb="30px">
          <Heading mb="10px" fontSize="xl">
            Thumbnail
          </Heading>
          <InputGroup onClick={onTumbnailUploadClickEvent}>
            <Input
              type="file"
              hidden
              multiple={false}
              ref={(e) => {
                fileInputRef.current = e;
              }}
              onChange={onFileInputChangeEvent}
            />
            <Button
              colorScheme="orange"
              size="sm"
              leftIcon={<Icon as={FiFile} />}
            >
              UPLOAD
            </Button>
          </InputGroup>
        </Box>
        <Box mt="40px">
          <Button
            w="100%"
            h="50px"
            fontSize="xl"
            variant="outline"
            colorScheme="teal"
            onClick={onPostButtonClickEvent}
          >
            POST
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
