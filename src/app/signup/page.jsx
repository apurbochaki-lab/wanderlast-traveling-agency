'use client'

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const RegisterPage = () => {
    const router = useRouter()

    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const { name, image, email, password } = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            name,
            image,
            email,
            password
        })

        if (!error) {
            toast.success("Signup Successful✨")
            router.push('/')
        } else {
            toast.error("Something went wrong!")
        }
    }

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }

    return (
        <div className="py-10 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81]">
            <Form onSubmit={handleSignup} className="flex w-100 flex-col gap-4 mx-auto border-2 py-10 px-8 rounded-lg shadow-sm bg-white/10 backdrop-blur-md">

                <h2 className="text-center text-white font-bold text-3xl mb-5">Register Your Account</h2>
                <TextField
                    isRequired
                    name="name"
                    type="text"
                >
                    <Label className="text-white font-bold text-[16px]">Your Name</Label>
                    <Input placeholder="Enter your name" />
                </TextField>
                <TextField
                    isRequired
                    name="image"
                    type="url"
                >
                    <Label className="text-white font-bold text-[16px]">Profile Image</Label>
                    <Input placeholder="Enter image URL" />
                </TextField>

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
                        Sign Up
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default RegisterPage;