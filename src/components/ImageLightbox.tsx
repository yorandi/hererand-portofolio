"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useRef, useState } from "react";

interface ImageLightboxProps {
    src: string;
    alt: string;
    caption?: string;
    sizes: string;
    fit?: "cover" | "contain";
}

/**
 * A thumbnail that opens the full image in a native modal <dialog>, which
 * provides Escape-to-close, focus trapping, and an inert background.
 * The parent must size the thumbnail box (the image fills it).
 */
export function ImageLightbox({ src, alt, caption, sizes, fit = "cover" }: ImageLightboxProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className="lightbox-trigger"
                aria-label={`View larger: ${alt}`}
                aria-haspopup="dialog"
                onClick={() => {
                    setOpen(true);
                    dialogRef.current?.showModal();
                }}
            >
                <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: fit }} />
            </button>
            <dialog
                ref={dialogRef}
                className="lightbox"
                aria-label={alt}
                onClose={() => setOpen(false)}
                onClick={(event) => {
                    if (event.target === event.currentTarget) dialogRef.current?.close();
                }}
            >
                <button
                    type="button"
                    className="lightbox-close"
                    aria-label="Close image"
                    onClick={() => dialogRef.current?.close()}
                >
                    <X size={20} aria-hidden="true" />
                </button>
                {open && (
                    <figure className="lightbox-figure">
                        <div className="lightbox-frame">
                            <Image src={src} alt={alt} fill sizes="92vw" style={{ objectFit: "contain" }} />
                        </div>
                        {caption && <figcaption>{caption}</figcaption>}
                    </figure>
                )}
            </dialog>
        </>
    );
}
