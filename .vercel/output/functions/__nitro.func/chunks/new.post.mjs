import { u as useRuntimeConfig, a as defu, g as getCookie, b as defineEventHandler, c as getQuery, e as getHeaders } from './nitro/vercel.mjs';
import { nanoid } from 'nanoid';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'vue';

const serverSupabaseClient = async (event) => {
  const {
    supabase: { url, key, cookieName, clientOptions }
  } = useRuntimeConfig().public;
  let supabaseClient = event.context._supabaseClient;
  if (!supabaseClient) {
    const options = defu({ auth: {
      detectSessionInUrl: false,
      persistSession: false,
      autoRefreshToken: false
    } }, clientOptions);
    supabaseClient = createClient(url, key, options);
    event.context._supabaseClient = supabaseClient;
  }
  const { data } = await supabaseClient.auth.getSession();
  if (data?.session?.user?.aud !== "authenticated") {
    const accessToken = getCookie(event, `${cookieName}-access-token`);
    const refreshToken = getCookie(event, `${cookieName}-refresh-token`);
    if (!accessToken || !refreshToken)
      return supabaseClient;
    await supabaseClient.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken
    });
  }
  return supabaseClient;
};

const new_post = defineEventHandler(async (event) => {
  try {
    const { link } = getQuery(event);
    const { apikey } = getHeaders(event);
    if (!link || typeof link !== "string" || !apikey || typeof apikey !== "string") {
      throw new Error("Missing parameters!");
    }
    const url = new URL(link);
    if (!url.protocol.includes("http")) {
      throw new Error("Invalid link! Must be a valid URL!");
    }
    const supabase = await serverSupabaseClient(event);
    let shortExists = true;
    let short = "";
    while (shortExists) {
      short = nanoid(2);
      const { data: existingShortlink } = await supabase.from("shortlinks").select("*").eq("short", short).single();
      if (!existingShortlink) {
        shortExists = false;
      }
    }
    const { data, error } = await supabase.functions.invoke("newShortlink", {
      body: JSON.stringify({
        short,
        link,
        apiKey: apikey
      })
    });
    console.log({ data, error });
    if (error) {
      throw new Error(error.message);
    }
    return {
      status: 200,
      message: "Success! New short URL created!",
      newShortlink: `${process.env.BASE_URL}/${short}`
    };
  } catch (err) {
    console.error(err);
    let error = err;
    return {
      status: 500,
      message: `Error! ${error.message}`
    };
  }
});

export { new_post as default };
//# sourceMappingURL=new.post.mjs.map
