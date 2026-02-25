'use client';

import React from 'react';
import { UserPlus, User, Mail, Lock } from 'lucide-react';
import useRegisterForm from '@/hooks/useRegisterForm';
import {
  AuthHeroPanel,
  AuthFormHeader,
  AuthFormWrapper,
  AuthTextField,
  PasswordStrengthBar,
  TermsCheckbox,
  SubmitButton,
  SocialLoginButtons,
  AuthFooterLink,
} from '@/components/auth';

export default function RegisterPage() {
  const {
    formState,
    errors,
    loading,
    isFormValid,
    passwordStrength,
    setField,
    handleSubmit,
    handleGoogleSignup,
    validateField,
  } = useRegisterForm();

  return (
    <div className="min-h-screen w-full flex bg-background text-foreground overflow-hidden">
      {/* Left Side — Animated Hero Panel */}
      <AuthHeroPanel
        icon={UserPlus}
        title="Join the Community"
        subtitle="Create your account and get access to millions of premium videos, exclusive content, and more."
        backgroundImage="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop"
        backgroundAlt="Cinema Experience"
      />

      {/* Right Side — Registration Form */}
      <AuthFormWrapper>
        <AuthFormHeader
          title="Create Account"
          subtitle="Sign up to start your premium streaming experience."
        />

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {/* Full Name */}
            <AuthTextField
              id="name"
              name="name"
              label="Full Name"
              icon={User}
              value={formState.name}
              onChange={(v) => setField('name', v)}
              onBlur={() => validateField('name')}
              placeholder="John Doe"
              error={errors.name}
              autoComplete="name"
            />

            {/* Email */}
            <AuthTextField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              icon={Mail}
              value={formState.email}
              onChange={(v) => setField('email', v)}
              onBlur={() => validateField('email')}
              placeholder="name@example.com"
              error={errors.email}
              autoComplete="email"
            />

            {/* Password + Strength Bar */}
            <AuthTextField
              id="password"
              name="password"
              label="Password"
              icon={Lock}
              value={formState.password}
              onChange={(v) => setField('password', v)}
              onBlur={() => validateField('password')}
              placeholder="••••••••"
              isPassword
              minLength={6}
              error={errors.password}
              autoComplete="new-password"
            >
              <PasswordStrengthBar
                password={formState.password}
                strength={passwordStrength}
              />
            </AuthTextField>

            {/* Confirm Password */}
            <AuthTextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              icon={Lock}
              value={formState.confirmPassword}
              onChange={(v) => setField('confirmPassword', v)}
              onBlur={() => validateField('confirmPassword')}
              placeholder="••••••••"
              isPassword
              minLength={6}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
          </div>

          {/* Terms & Conditions */}
          <TermsCheckbox
            checked={formState.agreed}
            onChange={(v) => setField('agreed', v)}
            error={errors.agreed}
          />

          {/* Submit */}
          <SubmitButton
            loading={loading}
            label="Create Account"
            disabled={!isFormValid}
          />

          {/* Social Login */}
          <SocialLoginButtons
            loading={loading}
            onGoogleClick={handleGoogleSignup}
            dividerText="Or sign up with"
          />
        </form>

        {/* Footer Link */}
        <AuthFooterLink
          text="Already have an account?"
          linkText="Sign in"
          href="/auth/login"
        />
      </AuthFormWrapper>
    </div>
  );
}
