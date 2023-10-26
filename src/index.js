const express = require("express");
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

const supabaseUrl = 'https://jccmvrgfgkuegqslhjot.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjY212cmdmZ2t1ZWdxc2xoam90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1MzQyMjUsImV4cCI6MjAxMzExMDIyNX0.lPS9IdMP5QzFGw2t-4P6VhK9uOlG2mGiHllj48GqMHY';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", (req, res) => {
  const data = { message: "It's Working! Isn't it?", port: "Lol", info: "This is a test" };
  res.json(data);
});

app.post("/createCountry", async (req, res) => {
  try {
    const { name, ccode, email } = req.body;
    const { data, error } = await supabase
      .from('countries')
      .upsert([
        {
          name,
          ccode,
          email,
        }
      ]);

    if (error) {
      throw error;
    }

    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
