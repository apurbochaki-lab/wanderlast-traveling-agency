'use client'

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

const LoginPage = () => {

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/"
        })

        if (!error) {
            toast.success("Login Success!")
        } else {
            toast.error("Invalid Email or Password!")
        }
    }

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }

    return (
        <div className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950">
            <Form onSubmit={handleLogin} className="flex w-100 flex-col gap-4 mx-auto border-2 py-10 px-8 rounded-lg shadow-sm bg-blue-950">

                <h2 className="text-center text-white font-bold text-3xl mb-5">Login Your Account</h2>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label className="text-white font-bold text-[16px]">Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError className={"text-red-500 font-semibold"} />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label className="text-white font-bold text-[16px]">Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError className={"text-red-500 font-semibold"} />
                </TextField>
                <Button onClick={handleGoogle} className="w-full" variant="tertiary">
                    <Icon icon="devicon:google" />
                    Sign in with Google
                </Button>
                <div className="mt-3 flex justify-end gap-5">
                    <Button type="reset" variant="secondary" className="text-red-400 font-bold rounded-lg">
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-green-600 font-bold rounded-lg">
                        <Check />
                        Login
                    </Button>

                </div>
            </Form>
        </div>
    );
};

export default LoginPage;