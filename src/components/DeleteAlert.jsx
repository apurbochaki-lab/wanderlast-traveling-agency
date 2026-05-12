"use client";

import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";
import { MdDelete } from "react-icons/md";

export function DeleteAlert({ destination }) {
    const {_id, destinationName} = destination;

    const handleDelete = async() => {
        const req = await fetch(`http://localhost:5000/destinations/${_id}`, {
            method: "DELETE",
            headers: {'content-type' : 'application/json'},
        })
        const data = await req.json();
        if (data.deletedCount > 0) {
            redirect('/destinations')
        }
        console.log(data)
    }

    return (
        <AlertDialog>
            <Button variant="outline" className={"rounded-none text-red-500"}><MdDelete/> Delete</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete destination permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{destinationName}</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} slot="close" variant="danger">
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}


