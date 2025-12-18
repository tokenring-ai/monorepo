#!/usr/bin/env perl
use strict;
use warnings;
use File::Copy;
use File::Spec;
use File::Basename;

# Configuration
my $source_dir = './boilerplate';
my @target_patterns = ('../pkg/*', '../app/*', '../frontend/*');

# Get the list of boilerplate files
opendir(my $dh, $source_dir) or die "Could not open boilerplate directory '$source_dir': $!";
my @boilerplate_files = grep { -f File::Spec->catfile($source_dir, $_) } readdir($dh);
closedir($dh);

print "Found " . scalar(@boilerplate_files) . " boilerplate files to sync.\n";

foreach my $pattern (@target_patterns) {
 # Use glob to expand the directories (e.g., pkg/*)
 my @dirs = glob($pattern);

 foreach my $package_dir (@dirs) {
  next unless -d $package_dir;

  print "Processing package: $package_dir\n";

  foreach my $file (@boilerplate_files) {
   my $src = File::Spec->catfile($source_dir, $file);
   my $dst = File::Spec->catfile($package_dir, $file);

   # Copy the file
   if (copy($src, $dst)) {
    print "  -> Copied $file\n";
   } else {
    warn "  [!] Failed to copy $file to $package_dir: $!\n";
   }
  }
 }
}

print "Done!\n";