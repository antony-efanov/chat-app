'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { IRegisterSchema, RegisterSchema } from '@/schemas';
import { CardWrapper } from '@/components/auth/CardWrapper';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTransition } from 'react';
import { register } from '@/actions/auth/register';

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<IRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });

    const onSubmit = (values: IRegisterSchema) => {
        startTransition(() => {
            register(values);
        });
    };

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={
                                                isPending || field.disabled
                                            }
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            ref={field.ref}
                                            type="text"
                                            placeholder="John Doe"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={
                                                isPending || field.disabled
                                            }
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            ref={field.ref}
                                            type="email"
                                            placeholder="johndoe@example.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={
                                                isPending || field.disabled
                                            }
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            ref={field.ref}
                                            type="password"
                                            placeholder="******"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={isPending}
                        variant="default"
                        type="submit"
                        className="w-full h-10"
                    >
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
