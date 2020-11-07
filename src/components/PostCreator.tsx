import { Button, Card } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { AuthContext } from '@/components/Auth';
import { createPost } from '@/libs/api/post';
import { IPost } from '@/libs/model/post';

interface IProps {
  addNewPost: (post: IPost) => void;
}

const PostCreator: React.FC<IProps> = ({ addNewPost }) => {
  const { currentUser } = React.useContext(AuthContext);
  return (
    <React.Fragment>
      {currentUser && (
        <Card>
          <Formik
            initialValues={{ content: '' }}
            validationSchema={Yup.object({
              content: Yup.string().required('Required'),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const createdPost = await createPost({
                content: values.content,
                authorId: currentUser.id,
              });
              addNewPost(createdPost);
              setSubmitting(false);
              resetForm();
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form>
                <div>{errors.content}</div>
                <Field
                  name="content"
                  component={TextField}
                  label="Post"
                  fullWidth
                  multiline
                  variant="filled"
                  placeholder="Please input text..."
                  InputProps={{ disableUnderline: true }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Send
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      )}
    </React.Fragment>
  );
};

export default PostCreator;
