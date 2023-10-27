handle cases for 1st creation of character/preferences *
set prefs should use update so we dont call get all campaigns again in that function *
creating 1st character sets preferences to that character *
cannot use set pref or get prefs functions without a character, handle a reply to discord for that as a return promise *
when deleting a character, handle deletion of preference items and set active chanracter to next available if needed *
work on skill check command*
make use of env *
create module file for caching functions, return value as false then use database or return early with data in same format as expected with function to send to top level *
figure out how to set and retrieve data, only after functions all work standalone *
use node-cache to if statement inside DB functions *