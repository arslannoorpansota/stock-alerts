import { useState } from 'react';
import axios from 'axios';

import ProfileLayout from '../../layouts/ProfileLayout';
import ErrorMessage from '../../components/ErrorMessage';
import { Form, FormField, FormInputFuncProps } from '../../components/form';
import Button from "../../components/Button";

export default function ChangePassword() {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = (value : Record<string, any>) => {
    setApiError('');
    setLoading(true);
    axios.put('/api/user/current', value)
      .catch((e) => setApiError(e))
      .finally(() => setLoading(false));
  };

  return (
    <ProfileLayout>
      <Form onSubmit={onSubmit} className="mt-6 max-w-lg w-full">
        <div className="space-y-6">
          <FormField type="text" name="oldPassword" label="Old Password" required>
            {({ errors, label, ...props }: FormInputFuncProps) => (
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  id="oldPassword" type="password" autoComplete="name" {...props}
                  className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-cyan-500 focus:ring-cyan-500"
                />
                {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
              </div>
            )}
          </FormField>
          <FormField type="text" name="password" label="New Password" required>
            {({ errors, label, ...props }: FormInputFuncProps) => (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  id="password" type="password" autoComplete="name" {...props}
                  className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-cyan-500 focus:ring-cyan-500"
                />
                {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
              </div>
            )}
          </FormField>
          <FormField type="text" name="confirmPassword" label="Confirm Password" required>
            {({ errors, label, ...props }: FormInputFuncProps) => (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  id="confirmPassword" type="password" autoComplete="name" {...props}
                  className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-cyan-500 focus:ring-cyan-500"
                />
                {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
              </div>
            )}
          </FormField>
        </div>

        {apiError && (
          <div className="px-4 py-4 sm:px-6 bg-white">
            <ErrorMessage error={apiError} />
          </div>
        )}

        <div className="mt-6">
          <Button type="submit" loading={loading}>Change Password</Button>
        </div>
      </Form>
    </ProfileLayout>
  );
}
