<template>
  <div>
    <nav class="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
      <div class="navbar-header">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="200" height="48" viewBox="0 0 200 48">
              <path d="M0,0 L200.000,0 L175.000,48.000 L-25.000,48.000 L0,0 Z" class="navbar-brand-svg" />
            </svg> -->
            <a class="navbar-brand" href="/" id="navbarTRMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><div class="menutext">F3I-2</div></a>
          </li>
        </ul>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown dropdown-left">
            <a class="nav-link menu-hover" href="/" id="TeamsMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="menutext">Teams</span>
            </a>
            <ul class="dropdown-menu" id="ulTeams" aria-labelledby="TeamsMenuLink">
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">TEAM 1</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">TEAM 2</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">TEAM 3</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">TEAM 4</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown dropdown-left">
            <a class="nav-link menu-hover" href="/" id="ProcessesMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="menutext">Processes</span>
            </a>
            <ul class="dropdown-menu" id="ulProcesses" aria-labelledby="ProcessesMenuLink">
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">CDRL Management</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">CDRL Government Review</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">Travel Authorization</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown dropdown-left">
            <a class="nav-link menu-hover" href="/" id="ProgramManagementMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="menutext">Program Management</span>
            </a>
            <ul class="dropdown-menu" id="ulProgramManagement" aria-labelledby="ProgramManagementMenuLink">
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">Program Management Office</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">Program Staffing</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">Work Plan Tracker</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">Risk Management</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown dropdown-left">
            <a class="nav-link menu-hover" href="/" id="ToolsMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="menutext">Tools</span>
            </a>
            <ul class="dropdown-menu" id="ulTools" aria-labelledby="ToolsMenuLink">
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">TOOL 1</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">TOOL 2</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">TOOL 3</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">TOOL 4</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu 0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <form role="search" class="form-inline my-2 app-search hidden-xs ">
          <input type="text" placeholder="Search..." class="form-control" v-model="searchinput" v-on:keyup.enter="searchme" />
          <a href="#" @click.stop="searchme"><i class="fa fa-search"></i></a>
        </form>
        <!-- <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link" href="#" id="SettingsMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <font-awesome-icon fas icon="cog" class="icon"></font-awesome-icon>
            </a>
            <ul class="dropdown-menu dropdown-menu-right" id="ulSettings" aria-labelledby="SettingsMenuLink">
              <li id="ulsettings_Ribbon" class="hidden settingsli"><font-awesome-icon fas icon="ribbon" class="icon"></font-awesome-icon><a class="dropdown-item" href="#">Hide Ribbon</a></li>
              <li id="ulsettings_Shared" class="hidden settingsli"><font-awesome-icon fas icon="share" class="icon"></font-awesome-icon><a class="dropdown-item" href="#">Shared with...</a></li>
              <li id="ulsettings_AddPage" class="hidden settingsli"><font-awesome-icon far icon="file-alt" class="icon"></font-awesome-icon><a class="dropdown-item" href="#">Add a page</a></li>
              <li id="ulsettings_EditPage" class="hidden settingsli"><font-awesome-icon far icon="edit" class="icon"></font-awesome-icon><a class="dropdown-item" href="#">Edit page</a></li>
              <li id="ulsettings_AddApp" class="hidden settingsli"><font-awesome-icon far icon="plus-square" class="icon"></font-awesome-icon><a class="dropdown-item" href="#">Add an app</a></li>
              <li id="ulsettings_Manager" class="hidden settingsli"><font-awesome-icon fas icon="pencil-alt" class="icon"></font-awesome-icon><a class="dropdown-item" href="#">Design Manager</a></li>
              <li id="ulsettings_Contents" class="hidden settingsli"><font-awesome-icon fas icon="box-open" class="icon"></font-awesome-icon><a class="dropdown-item" href="#">Site contents</a></li>
              <li id="ulsettings_Settings" class="hidden settingsli"><font-awesome-icon fas icon="cogs" class="icon"></font-awesome-icon><a class="dropdown-item" href="#">Site settings</a></li>
            </ul>
          </li>
        </ul> -->
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      searchinput: ''
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      console.log('Getting Navigation')
      // this.$store.dispatch('navbar/getNavigation')
      // this.$store.dispatch('navbar/getSiteActions')
    })
  },
  methods: {
    searchme: function() {
      /* window.location = 'https://navsea.navy.deps.mil/wc/surinhd/td/private/techrigor/Pages/SearchResults.aspx?k=' + this.searchinput */
      console.log('Woohoo')
    }
  }
}
</script>

<style lang="scss" scoped></style>
