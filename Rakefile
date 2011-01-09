require 'rubygems'
require 'rake'

begin
  require 'jeweler'
  Jeweler::Tasks.new do |gem|
    gem.name = "scuby-wars"
    gem.summary = %Q{Library for programming little AI-Bots, fighting against each other}
    gem.description = %Q{Library for programming little AI-Bots, fighting against each other}
    gem.email = "andi@galaxycats.com"
    gem.homepage = "http://github.com/galaxycats/scuby-wars"
    gem.authors = ["Andi Bade", "Dirk Breuer", "Sebastian Cohnen"]
    gem.add_dependency "yajl-ruby", ">= 0.7.8"
    gem.add_dependency "httparty", ">= 0.6.1"
    gem.add_dependency "i18n", ">= 0.5.0"
    gem.add_dependency "activesupport", ">= 3.0.3"
    # gem.add_development_dependency "thoughtbot-shoulda", ">= 0"
    # gem is a Gem::Specification... see http://www.rubygems.org/read/chapter/20 for additional settings
  end
  Jeweler::GemcutterTasks.new
rescue LoadError
  puts "Jeweler (or a dependency) not available. Install it with: gem install jeweler"
end

require 'rake/testtask'
Rake::TestTask.new(:test) do |test|
  test.libs << 'lib' << 'test'
  test.pattern = 'test/**/test_*.rb'
  test.verbose = true
end

begin
  require 'rcov/rcovtask'
  Rcov::RcovTask.new do |test|
    test.libs << 'test'
    test.pattern = 'test/**/test_*.rb'
    test.verbose = true
  end
rescue LoadError
  task :rcov do
    abort "RCov is not available. In order to run rcov, you must: sudo gem install spicycode-rcov"
  end
end

task :test => :check_dependencies

task :default => :test

require 'rake/rdoctask'
Rake::RDocTask.new do |rdoc|
  version = File.exist?('VERSION') ? File.read('VERSION') : ""

  rdoc.rdoc_dir = 'rdoc'
  rdoc.title = "scuby-wars #{version}"
  rdoc.rdoc_files.include('README*')
  rdoc.rdoc_files.include('lib/**/*.rb')
end
