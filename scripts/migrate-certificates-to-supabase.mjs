import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
    throw new Error(
        "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script.",
    );
}

const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
});

const certificates = [
    { title: "Aptis ESOL Certificate", issuer: "British Council", file: "aptis.png" },
    { title: "Machine Learning: Introduction with Regression", issuer: "Codecademy", file: "regression.png" },
    { title: "Machine Learning: K-Nearest Neighbors", issuer: "Codecademy", file: "k-nearest-neighbors.png" },
    { title: "Machine Learning: Random Forests & Decision Trees", issuer: "Codecademy", file: "random-forests-decision-trees.png" },
    { title: "Machine Learning: Clustering with K-Means", issuer: "Codecademy", file: "k-means-clustering.png" },
];

for (const certificate of certificates) {
    const localPath = join(root, "public", "certificates", certificate.file);
    const contents = await readFile(localPath);
    const storagePath = `local/${certificate.file}`;
    const contentType = `image/${extname(certificate.file).slice(1).replace("jpg", "jpeg")}`;
    const { error: uploadError } = await supabase.storage
        .from("certifications")
        .upload(storagePath, contents, { contentType, upsert: true });
    if (uploadError) throw uploadError;

    const imageUrl = supabase.storage
        .from("certifications")
        .getPublicUrl(storagePath).data.publicUrl;
    const { error: updateError } = await supabase
        .from("certifications")
        .update({ image_url: imageUrl })
        .eq("title", certificate.title)
        .eq("issuer", certificate.issuer);
    if (updateError) throw updateError;
    console.log(`Migrated ${certificate.title}`);
}