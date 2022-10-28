import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

import ProfileLayout from '../../layouts/ProfileLayout';
import ErrorMessage from '../../components/ErrorMessage';
import { FormField, Form, FormInputFuncProps } from '../../components/form';
import Button from "../../components/Button";
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';


export default function MyAccount() {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { data, mutate, error } = useSWR('/api/user/current');
  const svg = createAvatar(style, { seed: data && data.username });
  const sendVerificationEmail = () => {
    axios.post('/api/user/verify-email/', {})
      .then(() => {
      })
      .catch((e) => setApiError(e))
  }

  function sendImage(e: React.ChangeEvent<HTMLInputElement>) {
    let formData = new FormData();
    let files = e.target.files
    formData.append("avatar", files && files[0] as any);

    return axios.patch("/api/user/current", formData)
      .then(() => mutate())
      .catch((e) => setApiError(e))
      .finally(() => setLoading(false))
  }

  const onSubmit = (value: Record<string, any>) => {
    setApiError('');
    setLoading(true);
    axios.put('/api/user/current', value)
      .then(() => mutate())
      .catch((e) => setApiError(e))
      .finally(() => setLoading(false));
  };

  if (!data) {
    return (
      <ProfileLayout>
        Loading...
      </ProfileLayout>
    );
  }
  return (
    <ProfileLayout>
      <Form model={data} onSubmit={onSubmit} className="mt-6 space-y-6 max-w-lg w-full">
        {error && <ErrorMessage error={error} />}
        {apiError && <ErrorMessage error={apiError} />}
        <FormField type="text" name="firstName" label="First Name" required>
          {({ errors, label, ...props }: FormInputFuncProps) => (
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                id="firstName" type="text" autoComplete="name" {...props}
                className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-cyan-500 focus:ring-cyan-500"
              />
              {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
            </div>
          )}
        </FormField>
        <FormField type="text" name="lastName" label="Last Name">
          {({ errors, label, ...props }: FormInputFuncProps) => (
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                id="lastName" type="text" autoComplete="name" {...props}
                className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-cyan-500 focus:ring-cyan-500"
              />
              {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
            </div>
          )}
        </FormField>
        <div className="flex justify-between">
          <span className="sr-only">Profile Picture</span>
          {/* eslint-disable-next-line react/no-danger */}
          {data && data.avatar ? (
            <div className="h-20 w-20 rounded-full overflow-hidden">
              <img src={data && data.avatar} alt="User Profile" />
            </div>
          ) : (
            <div className="h-20 w-20 rounded-full overflow-hidden" dangerouslySetInnerHTML={{ __html: svg }} />
          )}

          <div className="flex justify-center items-center">
            <div className="">
              <label htmlFor="file-upload" className="cursor-pointer bg-indigo-500 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-indigo-50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 custom-file-upload">
                Change
              </label>
              <input id="file-upload" type="file" className=" hidden" onChange={e => sendImage(e)} />
            </div>
            
          </div>
        </div>
        <FormField type="text" name="username" label="Username" required>
          {({ errors, label, ...props }: FormInputFuncProps) => (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                id="username" type="text" autoComplete="name" {...props}
                className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-cyan-500 focus:ring-cyan-500"
              />
              {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
            </div>
          )}
        </FormField>
        <div>
          <div className="block text-sm font-medium text-gray-700">Email</div>
          <div className="">
            <div className="mt-2 mb-1 text-sm space-x-2">
              <span className="font-medium">{data && data.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                {!data?.isVerified && (
                  <span className="text-yellow-600">Email not verified</span>
                )}
              </div>
              <div>
                {!data?.isVerified && (
                  <span className="ml-4 flex-shrink-0">
                    <button onClick={sendVerificationEmail} type="button"
                      className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      Send verification email
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button type="submit" loading={loading}>Update</Button>
        </div>
      </Form>
    </ProfileLayout>
  );
}
