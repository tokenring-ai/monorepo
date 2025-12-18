#!/usr/bin/perl
use strict;
use warnings;
use File::Basename;
use File::Spec;

# Glob for the specific pattern pkg/*/index.ts
my @files = glob('pkg/*/index.ts');

foreach my $file (@files) {
 print "Processing $file...\n";

 # Read the entire file content
 open my $fh, '<', $file or die "Could not open '$file' for reading: $!";
 my $content = do { local $/; <$fh> };
 close $fh;

 # 1. Extract all imports from the top
 # This matches sequences of import statements (including multiline and 'with' clauses)
 my @imports = $content =~ /^(import\s+.*?;\s*)/gms;
 my $import_block = join('', @imports);

 # 2. Extract and remove the export default block
 # /s modifier allows . to match newlines
 if ($content =~ s/(export default \{.*?\} (satisfies|as) TokenRingPlugin;)//s) {
  my $plugin_body = $1;
  my $dir = dirname($file);
  my $new_file = File::Spec->catfile($dir, 'plugin.ts');

  # Write to plugin.ts (Imports + the Plugin block)
  open my $out_fh, '>', $new_file or die "Could not open '$new_file' for writing: $!";
  print $out_fh $import_block;
  print $out_fh "\n" if $import_block;
  print $out_fh $plugin_body . "\n";
  close $out_fh;

  # Write the modified index.ts (without the default export)
  open my $index_fh, '>', $file or die "Could not open '$file' for writing: $!";
  print $index_fh $content;
  close $index_fh;

  print "  - Created $new_file (with imports)\n";
  print "  - Updated $file\n";
 } else {
  print "  - No matching export default found in $file\n";
 }
}

print "Done.\n";