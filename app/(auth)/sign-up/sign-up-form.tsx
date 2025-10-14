'use client'

import { signUpDefaultValues } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { CardContent, CardFooter } from '@/components/ui/card'
import { signUpUser } from '@/lib/actions/user.actions'
import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'

const SignUpButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full bg-black text-white hover:bg-black/80 h-10"
    >
      {pending ? 'Submitting' : 'Sign Up'}
    </Button>
  )
}

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <>
      <CardContent className="space-y-4">
        <form action={action}>
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                defaultValue={signUpDefaultValues.email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                defaultValue={signUpDefaultValues.email}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="password"
                defaultValue={signUpDefaultValues.password}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="confirm password"
                defaultValue={signUpDefaultValues.password}
              />
            </div>
          </div>
          <CardFooter className="w-full p-0 pt-4 flex-col gap-2">
            <SignUpButton />
            {data && !data.success && (
              <div className="text-center text-destructive text-red-500">
                {data.message}
              </div>
            )}

            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/sign-in" target="_self" className="link">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </>
  )
}

export default SignUpForm
