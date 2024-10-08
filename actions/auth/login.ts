'use server';

import { signIn } from '@/auth';
import { ILoginSchema, LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { getDefaultRoomId } from '@/actions/rooms/getDefaultRoomId';

export const login = async (values: ILoginSchema) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Email does not exist!' };
    }

    // TODO: Complete when do email verification
    // if (!existingUser.emailVerified) {
    //   const verificationToken = await generateVerificationToken(
    //     existingUser.email,
    //   );
    //
    //   await sendVerificationEmail(
    //     verificationToken.email,
    //     verificationToken.token,
    //   );
    //
    //   return { success: "Confirmation email sent!" };
    // }

    const roomId = await getDefaultRoomId();

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: `/${roomId}`,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials!' };
                default:
                    return { error: 'Something went wrong!' };
            }
        }

        throw error;
    }
};
