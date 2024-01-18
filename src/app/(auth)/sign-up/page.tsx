'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SignUpUserDtoSchema, type SignUpUserDto } from '@/server/dtos/auth';

export default function SignUpPage() {
  const { register, handleSubmit } = useForm<SignUpUserDto>();


}
