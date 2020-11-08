import * as React from 'react';
import { mutate } from 'swr';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import styled from '@emotion/styled';
import { Button, Card } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { AuthContext } from '@/components/Auth';
import { createPost } from '@/libs/api/post';

const FormContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '16px',
  button: {
    margin: '8px',
  },
});

const PostCreator: React.FC = () => {
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
              await createPost({
                content: values.content,
                authorId: currentUser.id,
              });
              mutate('/api/posts');
              setSubmitting(false);
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormContainer>
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
                </FormContainer>
              </Form>
            )}
          </Formik>
        </Card>
      )}
    </React.Fragment>
  );
};

export default PostCreator;
