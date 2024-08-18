import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormFields, User } from '../types';
import { Button } from '../components/button/button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { AvatarUpload } from '../components/avatar-upload/avatar-upload';

import { getValidationSchema } from '../types/validation/controll-schema';
import { FormTitle } from '../components/form/form-title/form-title';
import { NameField } from '../components/form/name-field/name-field';
import { AgeGenderFields } from '../components/form/age-gender-fields/age-gender-fields';
import { EmailField } from '../components/form/email-field/email';
import { PasswordFields } from '../components/form/password-fields/password-fields';
import { CountryField } from '../components/form/country-filed/country-filed';
import { TermsField } from '../components/form/terms-field/terms-field';
import FormWrapper from '../components/form/form-wrap/form-wrap';
import { img64Converter } from '../utils/img-64-converter';
import { BackHomeButton } from '../components/back-home-button/back-home-button';
import { useNavigate } from 'react-router-dom';
import { addSubmission } from '../store/reducers/history-slice';

const FormControlPage = () => {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const schema = getValidationSchema(countries);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<FormFields>({
    resolver: yupResolver<FormFields>(schema),
    mode: 'all',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const password = watch('password');

  useEffect(() => {
    trigger('password');
    trigger('confirmPassword');
  }, [password]);

  const onSubmit = async (data: FormFields) => {
    const avatar64: string = await img64Converter(data.avatar);
    const formData: User = {
      ...data,
      avatar: avatar64,
    };
    dispatch(addSubmission(formData));
    navigate('/');
  };

  return (
    <main className="flex items-center justify-center flex-col py-12 md:py-20 gap-4">
      <BackHomeButton />
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <FormTitle />
        <div className="p-6 space-y-1">
          <NameField
            register={register}
            errors={errors}
            touchedFields={touchedFields}
          />
          <AgeGenderFields
            register={register}
            errors={errors}
            touchedFields={touchedFields}
          />
          <EmailField
            register={register}
            errors={errors}
            touchedFields={touchedFields}
          />
          <PasswordFields
            register={register}
            errors={errors}
            touchedFields={touchedFields}
          />
          <CountryField
            register={register}
            errors={errors}
            touchedFields={touchedFields}
          />
          <TermsField
            register={register}
            errors={errors}
            touchedFields={touchedFields}
          />
          <AvatarUpload
            register={register}
            errors={errors}
            touchedFields={touchedFields}
          />
        </div>
        <div className="flex items-center p-6">
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        </div>
      </FormWrapper>
    </main>
  );
};

export default FormControlPage;
